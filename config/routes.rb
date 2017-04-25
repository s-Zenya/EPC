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
  post 'export/create' => 'export#create'
  get 'sign_up' => 'users#new'
  post 'flash_card' => 'flash_card#index'
  patch 'flash_card' => 'flash_card#flip'
  get 'editing' => 'editing#index'
  post 'editing_delete' => 'editing#delete'
  get 'editing_edit' => 'editing#edit'
  post '/edit/update' => 'editing#update'
  post 'share' => 'share#top'
  get 'share' => 'share#top'
  get '/share/create' => 'share#index'
  get 'release_files_edit' => 'share#edit'
  post 'release_files' => 'share#create'
  post 'editing_to_json' => 'editing#toJson'
  post 'share_search' => 'share#search'
  get 'share_delete' => 'share#delete'

  get '/share/:id', to: 'share#show', as: 'fileshow'

  # ログイン処理
  namespace :user do
    get    :sign_in,  to: 'session#new'
    post   :sign_in,  to: 'session#create'
    delete :sign_out, to: 'session#destroy'
  end

  root 'top#index'
end
