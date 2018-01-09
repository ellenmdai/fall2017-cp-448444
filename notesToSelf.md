#Notes to self

kill -9 `ps ax | grep node | grep meteor | awk '{print $1}'`

SECURITY
https://www.quora.com/Is-meteor-js-secure-Since-everything-is-happening-on-the-client-side-isnt-it-possible-for-someone-to-intercept-or-read-the-DB-calls-in-the-console
XXS
http://www.east5th.co/blog/2015/09/07/hijacking-meteor-accounts-with-xss/
	add package browser-policy and run disallowInlineScripts() in the server
	
Other guides:
https://guide.meteor.com/
http://experimentsinmeteor.com/photo-blog-part-1/