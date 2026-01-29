# 1. Clean old builds
cd frontend
rm -rf dist/

# 2. Build the Angular project (ensure the URL is changed in environment.prod.ts first!)
ng build --configuration production

# 3. Build Docker image with a NEW tag (to force K8s to see a change)
docker build -t techfreaksyed/product-app:frontend .
docker push techfreaksyed/product-app:frontend