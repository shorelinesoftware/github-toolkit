import { Action } from './actions/action';
import { getActionAdapter } from './actions/actionAdapter';
import { autoIncrementPatch } from './actions/autoIncrementPatch';
import { createGithubClient } from './github/GithubClient';

async function run() {
  const actionAdapter = getActionAdapter();
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    if (githubToken == null) {
      throw new Error('GITHUB_TOKEN is not provided');
    }
    const github = createGithubClient(githubToken);

    const actionDictionary = {
      autoIncrementPatch,
    };

    const action = new Action(github, actionAdapter, actionDictionary);
    await action.run();
  } catch (e) {
    if (e instanceof Error) {
      actionAdapter.setFailed(e);
    }
  }
}

run();
