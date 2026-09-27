# Number Panel — Step 3
Adds a browser-only Admin Console:
- Number inventory
- Add/enable/disable demo numbers
- Client list
- Add clients
- Orders view
- Pricing/settings UI
- Dashboard statistics
- Mobile sidebar

This is a UI prototype. It does NOT provide real telecom numbers, real authentication, payment processing, or a secure database.

For production:
1. Build a server/API.
2. Store passwords hashed on the server.
3. Use role-based authorization for admins.
4. Keep telecom-provider and payment secrets server-side.
5. Connect only an authorised DID/telecom provider.
6. Add audit logs, validation, rate limits and backups.

Do not place API keys or secret credentials in GitHub Pages JavaScript.
