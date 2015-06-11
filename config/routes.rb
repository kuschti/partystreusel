Partystreusel::Engine.routes.draw do
  unless Rails.env.production?
    get ':page', to: 'styleguide#show', as: :styleguide, constraints: { page: /[a-zA-Z\-_\/]+/ }

    root to: "styleguide#show", page: 'index'
  end
end
