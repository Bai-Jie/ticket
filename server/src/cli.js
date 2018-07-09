// @flow

import './config'
import yargs from 'yargs';
import {commandStart} from "./cmd/start";

yargs
  .command(commandStart)
  .demandCommand()
  .strict()
  .parse();
