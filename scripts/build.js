#!/usr/bin/env node

import { rollup } from 'rollup';
import chalk from 'chalk';
import figlet from 'figlet';
import config from '../rollup.config.js';

console.log(chalk.green(figlet.textSync('Memory  LowCode  Editor')));

async function build() {
  try {
    const configs = Array.isArray(config) ? config : [config];
    
    for (const conf of configs) {
      const bundle = await rollup(conf);
      
      if (Array.isArray(conf.output)) {
        for (const output of conf.output) {
          await bundle.write(output);
        }
      } else {
        await bundle.write(conf.output);
      }
      
      console.log(chalk.blueBright(`构建入口 ${chalk.bold(conf.input)} 完成！`));
    }
    
    console.log(chalk.yellowBright(figlet.textSync('Build  Success!')));
    console.log(chalk.green('🎉 所有打包任务均已完成！'));
  } catch (error) {
    console.error(chalk.red('构建失败：'), error);
    process.exit(1);
  }
}

build();