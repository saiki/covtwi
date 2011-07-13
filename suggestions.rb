#!ruby
require "cgi"
require "net/http"

cgi = CGI.new
http = Net::HTTP.new("api.twitter.com")
response = nil
http.start { |h|
  response = h.get("/1/users/suggestions/"+cgi["slug"]+".json")
}
cgi.out({
          "status" => "200 OK",
          "type" => "text/json",
          "charset" => "utf-8",
          "connection" => "close"
    }){ cgi["callback"]+"("+response.body+")" }
