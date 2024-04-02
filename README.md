# README

## Starter pack for a [Ruby on Rails](https://rubyonrails.org/) API and [ReactJS](https://react.dev/) Frontend.

Featuring:

✅ JWT authentication out of the box

✅ Tailwind CSS

✅ Formik/Yup for forms and validation

✅ Minimal configuration to get deployed to render/netlify
  

### The Rails app uses:
  * [subroutine](https://github.com/guideline-tech/subroutine) for service objects
  * [minitest](https://github.com/minitest/minitest) for testing
  * [jwt](https://github.com/jwt/ruby-jwt) for server side token validation
  * [standardrb](https://github.com/standardrb/standard) for linting

### The React app uses:
  * [Formik](https://formik.org/) and [Yup](https://github.com/jquense/yup)
  * [Tailwind](https://tailwindcss.com/)
  * [eslint](https://eslint.org/) for linting

# Installation

*note: before building and installing the app you may want to replace all instances of "starter_pack" in the code base. See config/database.yml and config/application.rb*

1.) Clone the repo

2.) from the root (or `/app`) directory run `bundle install; rails db:create && rails db:migrate`

3.) Create a .env file in the root of the application and add the following:

`JWT_SECRET_KEY=< your secret key >`

`JWT_ALGORITHM=< your algorithm (I recommend HS256) >`

4.) Start the rails server with `rails server`

3.) from the `/client` directory run `npm install && npm run start`

# Deployment

With some minor configuration this app is ready to deploy. For ease of use I recommend deploying the client to [netlify](https://www.netlify.com/), and the rails applicaton to [render](https://render.com/). Both of these services offer a free tier (although I believe you may need to pay for a database on render).

To deploy the client to Netlify simply create a new app and configure the deploy/build to use the client directory:

<img width="563" alt="Screenshot 2024-04-01 at 6 24 39 PM" src="https://github.com/jackpaulcollins/react-on-rails-starter-pack/assets/33816695/75cf1d92-a154-4004-b5e7-f367a0e2c2ac">

The rails application should be able to be deployed to render just like any other [rails application](https://docs.render.com/deploy-rails)

# Testing
Currently, only the backend service objects are tested. Run the test suite with `RAILS_ENV=test bin/rails db:fixtures:load` then `bundle exec rails test`

