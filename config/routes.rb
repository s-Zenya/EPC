Rails.application.routes.draw do
  resources :words
  resources :userfiles
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get 'top' => 'top#index'
  get 'flash_card' => 'flash_card#index'
  get 'import' => 'import#index'
  get 'export' => 'export#index'
  get 'sign_up' => 'sign_up#index'

  root 'top#index'
end
