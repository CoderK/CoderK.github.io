require 'nokogiri'

Jekyll::Hooks.register :documents, :post_render do |post|
    nokogiri_doc = Nokogiri::HTML(post.output)

    nokogiri_doc.xpath("//img").each do |node|
        node.set_attribute('loading', 'lazy')
        parent = node.parent

        if parent.name == 'p'
            parent.set_attribute('class', 'image-wrapper')
        end
    end

    post.output = nokogiri_doc.to_html
end
