import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { LoadingProvider } from './contexts/LoadingContext'
import ErrorBoundary from './components/common/ErrorBoundary'
import { AuthProvider } from './contexts/AuthContext'
import { SkeletonProvider } from './contexts/SkeletonContext'
import { CourseProvider } from './contexts/CourseContext'
import { CatProvider } from './contexts/CatContext'
import { QuizProvider } from './contexts/QuizContext'
//import { AppLoadingProvider } from './contexts/AppLoadingContext'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ErrorBoundary>
      <Provider store={store}>
        <LoadingProvider>
          <AuthProvider>
            <CourseProvider>
              <CatProvider>
                <QuizProvider>
                  <SkeletonProvider>
                    <App />
                  </SkeletonProvider>
                </QuizProvider>
              </CatProvider>
            </CourseProvider>
          </AuthProvider>
        </LoadingProvider>
      </Provider>
    </ErrorBoundary>  
  </BrowserRouter>
)
