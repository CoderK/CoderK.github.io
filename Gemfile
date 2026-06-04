# Gemfile (권장안)
# frozen_string_literal: true
source "https://rubygems.org"

ruby File.read(".ruby-version").strip rescue nil

gem "jekyll", "~> 4.3"
gem "webrick", "~> 1.8"                  # Ruby 3.x에서 jekyll serve에 필요
gem "jekyll-paginate", "~> 1.1"          # 필요시 유지, v2를 쓰고 싶으면 교체
gem "jekyll-sass-converter", "~> 3.0"    # sass-embedded 기반
gem "sass-embedded", ">= 1.77"

group :jekyll_plugins do
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-feed", "~> 0.17"
end

gem "ffi", ">= 1.15"                     # 구 ffi 회피
gem "nokogiri", ">= 1.16"                # 구 nokogiri 회피

gem "logger", "~> 1.6"

# GitHub Pages를 쓴다면: gem "github-pages", group: :jekyll_plugins  (단, 버전 고정 많음)
# gem 'jekyll-admin', group: :jekyll_plugins  # 필요 시 유지