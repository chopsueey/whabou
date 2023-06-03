## Was machen wir zuerst?

Idee:

Frontenddesign: eigene Navbar plus Logo und andere Farben

Backend: mongoose.Schema für Userprofile und Fragen (erstes simples Muster)
dann routes plus controller für /dashboard (get request, wenn /dashboard im frontend geladen wird)

## Ziel:

      dann können wir im frontend die /dashboard route abfragen und die Daten mittels react rendern und stylen
      -> dann input felder und buttons für den user, um sein Profil zu vervollständingen
      (das sind wiederum post requests auf der /dashboard route, und das frontend sollte sich
      nach erfolg neu laden, sprich die neuen Userdaten anzeigen)


## Wie wollen wir diese Ideen in Aufgaben (feature-branches) zerkleinern?

Eine visuelle Roadmap wäre gut, um zu sehen, was wir schaffen wollen, wie weit wir sind
und wie viel Zeit wir noch haben. (ähnlich wie bei Maddy's mural board)
Wann wollen wir welche feautures fertig haben?

## Einwände, Ideen?

## Sollen wir ein Protokoll für Teambesprechungen führen?

Bei Discord extra channel dafür
Möchte jemand das freiwillig machen oder rotieren wir jedes Meeting?













## best practice for collection relations

embedded Schemas for simple relationships
references for more complex and independent collections, 
like Post collection which have multiple comments from multiple users

-> Likes -> Like collection, that stores the PostId and the UserId (who liked)

then, if you want to only show the liked posts, you would search the Like
collection for the UserId, who is currently logged in, and return
all PostId's, that match current UserId, which are the liked Posts, by the current User.

## Was kommt danach? Was ist das nächst Wichtigste?

Dashboardfeed? Fragen von abonnierten Usern werden im Feed angezeigt?
Und die Fragen, mit den meisten likes oder Antworten (also Beteiligung durch Kommentar
oder Ja/Nein Antwort) sollen auch geladen werden -> was ist neu und im trend
-> dafür wiederum ein ausgefeiltes Fragen Schema, das in Beziehung zum jeweiligen User steht
und dessen Werte, wie likes und antworten, in der Datenbank abspeichert, damit diese
dann vom frontend geladen werden können -> Userprofile -> wen hat der user abonniert?,
wer followed mir (aus der Sicht des Users)
diese Daten müssen dann mittels Schematas referenziert werden:
-> Stichwort: Subdocuments und Beziehungen zwischen Collections
(vielleicht später einfügen: welche Topics sind die Favoriten vom User?)

## Maybe Problematisch, aber erstmal nicht so wichtig

Was machen wir, falls wir manche Sachen schneller fertig kriegen oder
länger brauchen?

Was, wenn ein feature erst bearbeitet werden kann, wenn ein anderes fertig ist?
Teambesprechung und möglicherweise helfen oder eine andere Aufgabe suchen?


## eigene Ideen

Ergebniss (also wie viele Ja und Nein geanwortet haben)
erst anzeigen, wenn der User geantwortet hat.

Nur verifizierte User dürfen kommentieren, falls Kommentarfunktion an ist.
(sucht sich der User bei der Fragenerstellung aus)

User kann noch mehr Antwortmöglichkeiten hinzufügen:
'Bin mir nicht sicher'
'Ich weiß nicht'
'Vielleicht'
usw.

nicht verifizierte aber registrierte User dürfen nur Ja oder Nein auswählen.


## Zukunftsmusik

Monetization?

Werbung
advanced Datenabfrage (for Businesses)
zum Beispiel, wenn Seite populär wäre, könnte man die Antworten für
bestimmte Fragen in den Nachrichten nutzen (Meinungsumfrage)
oder Unternehmen wollen wissen, was angesagt ist, was im Trend ist
oder für mögliche Interessensgruppen bestimmtes Produkt entwickeln
oder eine Bedürfnis der breiten Masse mit einem neuen Produkt
befriedigen.