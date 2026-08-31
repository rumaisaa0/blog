Rails.application.routes.draw do
  devise_for :users, controllers: {
        sessions: 'users/sessions',
        registrations: 'users/registrations',
        confirmations: "users/confirmations"
      }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'users/view_profile', to: 'users#view_profile'
  patch '/users/update_profile', to: 'users#update_profile'

  # Admin user management
  resources :users, only: [:index, :show, :update, :destroy]
  resources :blogs, only: [:index, :show, :create, :update, :destroy] do
    resources :comments, only: [:create, :index]
    resources :contributors, controller: "blog_contributors", only: [:index, :create, :destroy]
    resources :edit_requests, controller: "blog_edit_requests", only: [:create, :index, :show] do
        member do
          patch :approve
          patch :reject
        end
  end 
  end

  resources :categories, only: [:index, :show] do
    resources :comments, only: [:create, :index]
  end
end