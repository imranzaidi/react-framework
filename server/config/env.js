import chalk from 'chalk';

const showDebugLog = `${process.env.SERVER_DEBUG_LOG}`.match(/true/i);
if (showDebugLog && process.env.NODE_ENV !== 'production') {
  // extra guard to make sure we don't log these to console in development
  console.log(chalk.blue(`Environment (${process.env.NODE_ENV}):`), '\n');
  console.log(process.env, '\n');
}
