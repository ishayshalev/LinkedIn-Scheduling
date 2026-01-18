import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { PostsProvider } from '@/hooks/usePosts';
import { FeedPage } from '@/pages/FeedPage';
import { SchedulePage } from '@/pages/SchedulePage';

function App() {
  return (
    <BrowserRouter>
      <PostsProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
          </Routes>
        </MainLayout>
      </PostsProvider>
    </BrowserRouter>
  );
}

export default App;
