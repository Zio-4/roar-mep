import jsPsychVideoKeyboardResponse from "@jspsych/plugin-video-keyboard-response";
import jsPsychImageButtonResponse from "@jspsych/plugin-image-button-response";
import { config, jsPsych } from "./config";
import { imgContent, videoContent } from "./preload";

const kwargs = {
  type: jsPsychVideoKeyboardResponse,
  choices: config.testingOnly ? "ALL_KEYS" : "NO_KEYS",
  trial_ends_after_video: true,
  width: 1238,
  height: 800,
  response_allowed_while_playing: config.testingOnly,
};

const buttonHtml = `<button class="star-center transparent"><img draggable="false" style="width: 350px; height: 350px;" src="${imgContent.star}" /></button>`;
const clickStarTrial = {
  type: jsPsychImageButtonResponse,
  stimulus: [imgContent.advance],
  choices: [""],
  button_html: buttonHtml,
  stimulus_width: 1238,
  data: {
    task: "continue_from_video",
  },
  margin_vertical: "inherit",
  margin_horizontal: "inherit",
};

const videoPrefix = config.pseudoFont ? "pseudo" : "latin";

/* define instructions trial */
const introTrial = [{
  stimulus: [videoContent[`${videoPrefix}Intro`]],
  ...kwargs,
}, clickStarTrial];

const postPracticeTrial = [{
  stimulus: [videoContent[`${videoPrefix}PostPractice`]],
  ...kwargs,
}, clickStarTrial];

const postTwoLetterBlockTrial = [{
  stimulus: [videoContent[`${videoPrefix}Post2Block`]],
  ...kwargs,
}, clickStarTrial];

const postBlock1Trial = [{
  stimulus: [videoContent[`${videoPrefix}Block1`]],
  ...kwargs,
}, clickStarTrial];

const rewardAnimation1Trial = [{
  stimulus: [videoContent[`${videoPrefix}RewardAnimation1`]],
  ...kwargs,
}, clickStarTrial];

const rewardAnimation2Trial = [{
  stimulus: [videoContent[`${videoPrefix}RewardAnimation2`]],
  ...kwargs,
}, clickStarTrial];

const endTrial = [{
  stimulus: [videoContent[`${videoPrefix}End`]],
  ...kwargs,
  on_load: function () {
    jsPsych.setProgressBar(1);
  },
}, clickStarTrial];

const videoTrials = {
  intro: introTrial,
  postPractice: postPracticeTrial,
  postTwoLetterBlock: postTwoLetterBlockTrial,
  postBlock1: postBlock1Trial,
  rewardAnimation1: rewardAnimation1Trial,
  rewardAnimation2: rewardAnimation2Trial,
  end: endTrial,
};

export default videoTrials;
