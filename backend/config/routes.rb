# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    confirmations: 'users/confirmations'
  }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'users/view_profile', to: 'users#view_profile'
  patch '/users/update_profile', to: 'users#update_profile'

  # Admin user management
  resources :users, only: %i[index show update destroy]
  resources :blogs, only: %i[index show create update destroy] do
    resources :comments, only: %i[create index]
    resources :contributors, controller: 'blog_contributors', only: %i[index create destroy]
    resources :edit_requests, controller: 'blog_edit_requests', only: %i[create index show] do
      member do
        patch :approve
        patch :reject
      end
    end
  end

  resources :categories do
    resources :comments, only: %i[create index]
  end

  namespace :admin do
    get 'reports', to: 'reports#index'
  end

  get '/organizations', to: 'organizations#index'
end
