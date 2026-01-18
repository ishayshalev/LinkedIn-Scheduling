import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { PostsProvider } from '@/hooks/usePosts';
import { SchedulingDialogProvider } from '@/components/scheduling/SchedulingDialogContext';
import { SchedulingDialog } from '@/components/scheduling/SchedulingDialog';
import { FeedPage } from '@/pages/FeedPage';

function App() {
  return (
    <BrowserRouter>
      <PostsProvider>
        <SchedulingDialogProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<FeedPage />} />
            </Routes>
          </MainLayout>
          <SchedulingDialog />
        </SchedulingDialogProvider>
      </PostsProvider>
    </BrowserRouter>
  );
}

export default App;
