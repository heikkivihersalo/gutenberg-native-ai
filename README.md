# Gutenberg Native AI

This project is meant to integrate AI features natively into the Gutenberg editor using shortcuts to handle the user's commands.

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
