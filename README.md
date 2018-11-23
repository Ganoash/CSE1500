# CSE1500

Assignment 1
1.1)
HEAD/regenradar/nederland/HTTP/1.1
host: www.weer.nl 

HTTP/1.1 400 Bad Request
Date: Fri, 23 Nov 2018 14:45:13 GMT
Server: Apache
Content-Length: 226
Connection: close
Content-Type: text/html; charset=iso-8859-1

<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>400 Bad Request</title>
</head><body>
<h1>Bad Request</h1>
<p>Your browser sent a request that this server could not understand.<br />
</p>
</body></html>


HEAD /regenradar/nederland/ HTTP/1.1
host:www.weer.nl

HTTP/1.1 200 OK
Age: 529
Cache-Control: max-age=600
Content-Type: text/html; charset=utf-8
Date: Fri, 23 Nov 2018 14:41:30 GMT
Server: nginx/1.12.0
Vary: Accept-Encoding
Via: 1.1 varnish-v4
X-Cache: HIT
X-Powered-By: PHP/5.5.26
X-Varnish: 1072376830 1072125493
Connection: keep-alive


GET /regenradar/nederland/ HTTP/1.1
host:www.weer.nl

HTTP/1.1 200 OK
Accept-Ranges: bytes
Age: 579
Cache-Control: max-age=600
Content-Type: text/html; charset=utf-8
Date: Fri, 23 Nov 2018 14:41:30 GMT
Server: nginx/1.12.0
Vary: Accept-Encoding
Via: 1.1 varnish-v4
X-Cache: HIT
X-Powered-By: PHP/5.5.26
X-Varnish: 1072642358 1072125493
transfer-encoding: chunked
Connection: keep-alive



1.2)
No. Everything that is done with JavaScript is not executed in telnet, which is why the content of the page looks so simple. The map, for instance, is not present.

1.3)
X-Cache:
The 'X-' indicates that the header is not part of the spec.
The X-Cache tag indicates whether anything has been found in the web cache. If this isn't the case, the tag will show: 'MISS'.
If something has been found, however, the tag will show: 'HIT'.

1.4)
The Cache-Control HTTP header specifies browser caching policies in both client requests and server responses. Policies include how a resource is cached, where it’s cached and its maximum age before expiring.





