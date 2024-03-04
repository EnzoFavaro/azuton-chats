import { Router } from './router';
import { FormProvider } from './contexts/FormContext';
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
  gtmId: 'GTM-KJN9B6RS'
}

declare global {
  interface Window {
    dataLayer:any;
  }
}

const App = () => {
  return (
    <FormProvider>
      <Router />
    </FormProvider>
  );
}
TagManager.initialize(tagManagerArgs)
export default App;