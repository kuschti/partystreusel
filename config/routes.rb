Partystreusel::Engine.routes.draw do
  unless Rails.env.production?
    get '/styleguide/:page', to: 'styleguide#show', as: :styleguide, constraints: { page: /[a-zA-Z\-_\/]+/ }
    get '/styleguide', to: 'styleguide#show', page: 'index'
  end
end
