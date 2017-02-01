Rails.application.routes.draw do
  namespace :user do
    get 'session/show'
  end

  namespace :user do
    get 'session/new'
  end

  resources :words
  resources :userfiles
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get 'top' => 'top#index'
  get 'flash_card' => 'flash_card#index'
  get 'import' => 'import#index'
  get 'export' => 'export#index'
  get 'sign_up' => 'users#new'

  # ログイン処理
  namespace :user do
    get    :sign_in,  to: 'session#new'
    post   :sign_in,  to: 'session#create'
    delete :sign_out, to: 'session#destroy'
  end

  root 'top#index'
end
