import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { PostsProvider } from '@/hooks/usePosts';
import { FeedPage } from '@/pages/FeedPage';

function App() {
  return (
    <BrowserRouter>
      <PostsProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<FeedPage />} />
          </Routes>
        </MainLayout>
      </PostsProvider>
    </BrowserRouter>
  );
}

export default App;
