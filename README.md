<p align="center">
  <img src="readme.jpg" width="100%" align="center" alt="Hero image" />
  <h1 align="center">Gutenberg Native AI</h1>
  <p align="center">
    Experimental plugin that extends the Gutenberg editor with AI features designed to work natively with WordPress. Written in Typescript, React and PHP.
  </p>
</p>

<br/>

<p align="center">
	<a href="https://github.com/heikkivihersalo/gutenberg-native-ai/commits/main/" rel="nofollow"><img src="https://img.shields.io/github/last-commit/heikkivihersalo/gutenberg-native-ai/main" alt="Kotisivu Block Theme last commit"></a>
	<a href="https://www.linkedin.com/in/vihersalo/" rel="nofollow"><img src="https://img.shields.io/badge/created%20by-@heikkivihersalo-AD0048.svg" alt="Created by Heikki Vihersalo"></a>
	<a href="https://github.com/heikkivihersalo/gutenberg-native-ai/actions/workflows/lint-php.yml" rel="nofollow"><img src="https://github.com/heikkivihersalo/gutenberg-native-ai/actions/workflows/lint-php.yml/badge.svg" alt="PHP Linting badge"></a>
	<a href="https://github.com/heikkivihersalo/gutenberg-native-ai/actions/workflows/lint-js.yml" rel="nofollow"><img src="https://github.com/heikkivihersalo/gutenberg-native-ai/actions/workflows/lint-js.yml/badge.svg" alt="JS Linting badge"></a>
	<a href="https://github.com/heikkivihersalo/gutenberg-native-ai/actions/workflows/lint-css.yml" rel="nofollow"><img src="https://github.com/heikkivihersalo/gutenberg-native-ai/actions/workflows/lint-css.yml/badge.svg" alt="CSS Linting badge"></a>
	<a href="https://lmo.wordpress.org/about/license/" rel="nofollow"><img src="https://img.shields.io/github/license/heikkivihersalo/gutenberg-native-ai" alt="License"></a>
</p>

<div align="center">
  <a href="https://platform.openai.com/">Open AI Platform</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://react.dev/">React</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.typescriptlang.org/">TypeScript</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.php.net/">PHP</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.linkedin.com/in/vihersalo/">@heikkivihersalo</a>
  <br />
</div>

<br/>
<br/>

> [!NOTE]
> Please do note that this project is still in its early stages and is not yet ready for serious production use. It basically works but use it at your own risk.

## API Keys

ChatGPT requires an API key to work. You can get one by accessing Open AI dashboard at [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys). Once you have your API key, you can save it to the database from WordPress admin panel.

It should also be noted that API requires credits to work. These can be purchased from the Open AI dashboard.

Pricing information can be found at [https://platform.openai.com/pricing](https://platform.openai.com/pricing), but to give you a rough estimate, the cost to generate text is basically free (it so little it doesn't really matter). Images ranges between 0.02€ to 0.06€ per images. These prices are subject to change, so please refer to the Open AI website for the most up-to-date information.

## Installation

To install the plugin, you can download the latest release from the [releases page](https://github.com/heikkivihersalo/gutenberg-native-ai/tags). Download the file named `gutenberg-native-ai.zip` and upload it to your WordPress site by going to the admin panel and selecting `Plugins > Add New > Upload Plugin`.

You can also download the source but remember to run `yarn install` to install the required dependencies.

## Basic Usage

To access the AI features, you can use the following shortcuts in the Gutenberg editor:

-   `CMD + .` to open the AI modal. (Windows equivalent: `CTRL + .`)
