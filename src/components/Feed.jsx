import { useEffect, useState } from "react";
import { Questions } from "./Questions";
import { getFeed } from "../fetchRequests/QuestionRequests";
import GeneralStore from "../store/GeneralContext";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Feed() {
  const { activeTab } = GeneralStore();
  const [sortedQuestions, setSortedQuestions] = useState(null);
  const [answersOfUser, setAnswersOfUser] = useState(null);
  const [likesOfUser, setLikesOfUser] = useState(null);
  const [userIsFollowing, setUserIsFollowing] = useState(null);
  const [userFollowers, setUserFollowers] = useState(null);

  const [sortBy, setSortBy] = useState("latest");
  const { isLoading, setIsLoading } = GeneralStore();

  useEffect(() => {
    (async function request() {
      setIsLoading(true);
      const feed = await getFeed(sortBy);
      setSortedQuestions(feed.found);
      setAnswersOfUser(feed.userAnswers);
      setLikesOfUser(feed.userLikes);
      setUserIsFollowing(feed.userIsFollowing);
      setUserFollowers(feed.userFollowers);
      setIsLoading(false);
    })();
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, [sortBy, activeTab]);

  return (
    <div
      data-aos="zoom-in-down"
      data-aos-delay="100"
      className={activeTab === "Feed" ? "row feed" : "hidden"}
    >
      <div className="flex justify-end">
        <select
          className="bg-black"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="latest">latest</option>
          <option value="lastHour">one hour</option>
          <option value="last12Hours">12 hours</option>
          <option value="last24Hours">24 hours</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
        </div>
      ) : sortedQuestions && sortedQuestions.length > 0 ? (
        <Questions
          questions={sortedQuestions}
          answers={answersOfUser}
          likes={likesOfUser}
          isFollowing={userIsFollowing}
          followers={userFollowers}
        />
      ) : (
        <h2 className="text-center">Nothing found :/</h2>
      )}
    </div>
  );
}
