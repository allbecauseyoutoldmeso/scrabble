Rails.application.routes.draw do
  root 'games#index'

  resource :games, only: [:index] do
    get :all_tiles
    get :hand
    get :tile_rack
  end
end
