import { useEffect, useState } from "react";
import { Questions } from "../components/Questions";
import { updateQuestion } from "../fetchRequests/QuestionRequests";
import GeneralStore from "../store/GeneralContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";

export function QuestionPage() {
  const { state } = useLocation();
  const { activeTab } = GeneralStore();
  const [sortedQuestions, setSortedQuestions] = useState(null);
  const [answersOfUser, setAnswersOfUser] = useState(null);
  const [likesOfUser, setLikesOfUser] = useState(null);
  const [userIsFollowing, setUserIsFollowing] = useState(null);
  const [userFollowers, setUserFollowers] = useState(null);

  const { isLoading, setIsLoading } = GeneralStore();

  useEffect(() => {
    (async function request() {
      setIsLoading(true);
      const feed = await updateQuestion(state.question._id);
      console.log(feed);
      setSortedQuestions([feed.found]);
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
  }, [activeTab]);

  return (
    <div data-aos="zoom-in-down" data-aos-delay="100">
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
