shell: cd apps/shell && npm i && rm -rf dist && npm run build && npx serve dist -p 5173 -s
app1: cd apps/app-1 && npm i && rm -rf dist && npm run build -- --base http://localhost:5174/app-1/ && npm run preview
app2: cd apps/app-2 && npm i && rm -rf dist && npm run build -- --base http://localhost:5175/app-2/ && npm run preview
app3: cd apps/app-3 && npm i && rm -rf dist && npm run build -- --base http://localhost:5176/app-3/ && npm run preview
