# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "bootstrap" # @5.3.3
#pin "@popperjs/core", to: "@popperjs--core.js" # @2.11.8
pin "@popperjs/core", to: "https://ga.jspm.io/npm:@popperjs/core@2.11.6/lib/index.js" # @2.11.8
pin "filepond" # @4.31.1
pin_all_from "app/javascript/custom", under: "custom"
pin "filepond-plugin-image-preview" # @4.6.12
pin "filepond-plugin-file-validate-type" # @1.2.9
