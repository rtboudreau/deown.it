Rails.application.routes.draw do
  root to: redirect('/posts')

  get 'posts', to: 'site#index'
  get 'posts/new', to: 'site#index'
  get 'posts/:id', to: 'site#index'
  get 'posts/:id/edit', to: 'site#index'

  namespace :api do
    resources :posts, only: %i[index show create destroy update]
  end
end
