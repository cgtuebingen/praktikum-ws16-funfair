# How to contribute

Haltet euch an euren vereinbarten GIT workflow:
https://git-scm.com/book/de/v1/Git-Branching-Branching-Workflows

## Making Changes

* Erstellt lokal einen neuen Branch mit den Änderungen:
  `git checkout -b [branch-name]`
* Erstellt nun mehrere Commits in dem Branch.
* Versucht unötige Änderungen (Whitespaces zu entfernen) `git diff --check` .
* Formuliert eine gute Commit-Nachricht!


## Commit - Messages

Commits ohne zugehörigen Issue sind schon verdächtig und zeigen wenig Planung.

Die GIT-Commits sollten sich wie eine Geschichte lesen und meistens zu einem speziellen Issue gehören, sowie alle nötigen Informationen beinhalten. Beispiel

````
    Vereinfacht die Verwendung vom Emotiv-Gerät

    Bisher musste man das Device immer auf den Kopf setzen und einschalten. Das ist unproduktiv.

    Dieser Commit beinhaltet magische Codezeilen, sodass man von nun an das Gerät weder aus der Verpackung nehmen noch einschalten muss. Die Grundidee ist ...
    Damit sind die Aufgaben und Issues #31, #46, #8891 gelöst.
````

Es sollte stehts der Grund der Änderung und eine grobe Skizze der Änderung im Commit stehen.

Die Nachricht

````
    Quick Bugfix

    Beseitigt Fehler beim Einlesen von Daten
````

ist ein schlechtes Beispiel. Wo lag der Fehler? Warum gab es den Fehler? Was wurde unternommen, um den Fehler zu beseitigen.


## Submitting Changes

Wenn der Commit in einem extra Branch, wie "patch-1" angelegt wurde, so push diesen Branch. Damit die neuen Commits in den stabilen master - branch übernommen werden können, sollten die Änderungen von mindestens einer Person für gut befunden werden:

https://lgtm.co/

