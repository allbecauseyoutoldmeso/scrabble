Rails.application.routes.draw do
  root 'games#index'

  resource :games, only: [:index] do
    get :all_tiles
    get :new_hand
  end
end
