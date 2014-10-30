Bot Possession Boilerplate
==========================

Bot possession allows you to monitor conversations between your Pandorabot and users in realtime, with the option to "take over" the conversation at any time. Please read [this blog post](http://blog.pandorabots.com/bot-possession/) for the main gist.

Requirements
------------

1. Pandorabots `app_id` and `user_key` (register with the [Developer Portal](https://developer.pandorabots.com))

2. [Firebase](https://www.firebase.com/) account and application URI

Workflow
--------

The three interfaces all listen for additions to Firebase, and will change state depending on the new object's `type` and `client_name`. There are five different types of objects bot possession will store in Firebase:

`type: "botchat"` - contains complete interactions between the user and the bot (input/output)

`type: "agentchat"` - contains a message from the human agent to the user (during possession)

`type: "customerchat"` - contains a message from the user to the human agent (during possession)

`type: "possess"` - tells the user interface that the conversation has now been possessed

`type: "unposses"` - tells the user interface that the conversation has been returned to the bot


Cookies
-------

This code uses [talk.js](https://github.com/pandorabots/talk.js), which relies on cookies to remember the identity of your users. Therefore, you must host these files on a server, or enable file cookies in your browser to run locally.
