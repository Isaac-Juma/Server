# Still stuck on how to handle the User Profile in the backend 
# 1: HOW TO POST user data like image to my db and update it anytime the user decides to change 
# 2: How TO Get the same user profile pic and details when user logs in to use the product 

Implementing JWT 
1: client sends Post /api/auth/login
2: Controller looks up user in DB + checks password
3: if valid -> auth/auth.js creates JWT Token
4: Response sends token back to client
5: Future requests include header: -> Authorization:   Bearer <token>
6: Route has authMiddleware :
    it calls auth/auth.js to verify token
    if good: next => controller actions runs
    if bad : returns 401/403
    
