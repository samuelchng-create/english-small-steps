# Small Steps · English

A four-week SEC G2 English (K200, 2027) foundation pilot for a secondary student. Original short activities; not an official paper, grade predictor or complete exam simulator.

## Features

- 28 missions across literal comprehension, inference, vocabulary, language effects, visual texts, summary, editing, situational writing, continuous-writing planning, listening and oral planning.
- Progressive hints, immutable first attempts, revisions and explicit support records.
- Topic choices and tentative self-reported preferences; no personality or motivation diagnosis.
- Tutor reports for latest session, last seven days or all sessions. Includes actual answers, reference feedback, assistance, revisions and a follow-up teaching script.
- Copy, text download, or browser Print → Save PDF. Reports are **template-generated**, not AI assessments.
- Tutor guidance on the shared device; backup export/import; local reset.
- Optional server-side AI coaching, after explicit per-request opt-in.

## Run locally

Requires Node 22 or newer; no dependencies.

```sh
node build.mjs
node --test test.mjs
node serve.mjs
```

Open http://127.0.0.1:4173. The local preview does not impersonate Sites user identity; AI calls require authenticated hosted access. Do not expose the local server to the internet.

## Build and host

```sh
node build.mjs
node --test test.mjs
```

`worker.mjs` is a self-contained Cloudflare Worker containing the website and optional authenticated AI endpoint. Deploy through an authenticated Worker-compatible host. The handler expects Sites-injected `oai-authenticated-user-id`; on another host, replace that check with trusted server-side authentication. Never trust a client-supplied identity header on an unprotected deployment. Keep pilot access private.

`index.html` is a generated static fallback with the complete practice and reporting experience. It can be served by any static web host, but the AI endpoint requires the Worker deployment. `bank.mjs`, `core.mjs`, `app.mjs`, `server.mjs`, `template.html` and `style.css` are the editable source. Run `node build.mjs` after changing them to regenerate `index.html` and `worker.mjs`.

Live pilot: https://samuelchng-create.github.io/english-small-steps/ (GitHub Pages, static practice and reports). Live AI coaching remains unconfigured. No real learner data or API credentials are included.

## Enable live AI

Live AI is **off until configured**. Use a server-side `OPENAI_API_KEY` secret and `OPENAI_MODEL` environment setting. Never put a key in source, HTML, browser storage or a GitHub commit. For Sites, configure secrets through the supported OpenAI Developers / Sites flow. ChatGPT subscription access does not automatically configure an API key for this app.

The API uses the Responses endpoint with `store:false`, bounded inputs, a 25-second timeout and 700 output tokens. It transmits only the selected original source, question, reference guidance and learner answer. AI output is unverified coaching, not marking. A per-isolate 20-request/hour/user throttle is defence in depth, **not** a distributed quota. Configure provider spend limits; add durable rate limiting before wider deployment. Private Site access is the current access boundary.

## Privacy and pilot limitations

Answers and progress are stored only in this browser (`smallsteps.v1` localStorage), not in a central database. Anyone sharing that browser profile can read them. Download a backup before clearing data or switching device. No automatic email, cloud sync, verified tutor account or shared report link. Reports/backups contain answers and should be shared deliberately. No microphone or camera access is requested; oral notes cannot assess pronunciation or delivery. Browser speech synthesis provides listening practice and may be unavailable on some devices.

The tutor should review the starter materials and reference guidance before use. The four settings repeat some task structures to build routines; repeat practice is not evidence of transfer. Short passages, 50-word summaries, shortened writing and oral planning are foundation work. Full G2 timed papers, full video oral simulations and adaptive AI-generated lesson sequences are future work. The app records skill evidence but does not yet implement a psychometrically validated adaptive model.

## Syllabus reference

Official listing: https://www.seab.gov.sg/secondary-education-certificate-sec/g2-syllabuses-for-school-candidates-2027/

K200: Writing 35%, Comprehension 35%, Listening 10%, Oral 20%. The full situational-writing task is 180–250 words, continuous writing 250–400, and summary about 80 words. Consult the official syllabus for full requirements.

## Recommended pilot

Try five short sessions weekly. Have the tutor review the weekly report and enter one specific teaching focus. Recheck progress using unfamiliar, unaided examples, including handwriting. Measure reduced support and explanation quality, rather than activity totals alone.

## Exam-style final questions (October 2026 update)

Each of the 28 missions now ends with a related original written task using exam-style commands, response requirements and indicative practice marks. The final task unlocks after the guided activities have been attempted. Hints and reference guidance are unavailable until the first final answer is saved. Sources for most comprehension tasks are new, so they practise applying the skill rather than selecting the same multiple-choice answer again.

Coverage: evidence-supported inference, explanation of wording, poster persuasion, about-80-word summary with a paragraph range and supplied opening, two-line grammar editing, 180–250-word situational writing using a stimulus, and listening note completion. These are original exercises, not official SEAB questions or validated mark schemes. Visual tasks use described/text stimuli; listening uses synthetic speech and permits replay. This is not a full exam simulation. Tutor review is required.

Tutor reports show the final task, source, original answer, support and revisions. Unfinished saved sessions gain the new final item without losing their existing answers. Completed historical sessions remain unchanged and are labelled as predating this addition.
