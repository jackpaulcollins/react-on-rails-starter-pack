Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "login", to: "authentication#login"
      post "exchange", to: "authentication#exchange"
      post "refresh", to: "authentication#refresh"

      resources :users
    end
  end
end
