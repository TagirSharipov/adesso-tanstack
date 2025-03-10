import { HeadContent, Link, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import * as React from 'react';
import type { QueryClient } from '@tanstack/react-query';
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary';
import { NotFound } from '~/components/NotFound';
import LanguageDetector from 'i18next-browser-languagedetector';
import appCss from '~/styles/app.css?url';
import { seo } from '~/utils/seo';
import { PrimeReactProvider } from 'primereact/api';
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';

import { Button } from 'primereact/button';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: {
          'Welcome Home!!!': 'Welcome Home!!!',
          Users: 'Users',
          id: 'ID',
          name: 'Name',
          email: 'Email',
          gender: 'Gender',
          status: 'Status',
          back: 'Back',
          'Search by id': 'Search by id',
          'Search by name': 'Search by name',
          'Search by email': 'Search by email',
          'Select One': 'Select one',
        },
      },
      it: {
        translation: {
          'Welcome Home!!!': 'Benvenuto!!!',
          Users: 'Utenti',
          id: 'ID',
          name: 'Nome',
          email: 'Email',
          gender: 'Genere',
          status: 'Stato',
          back: 'Indietro',
          'Search by id': 'Cerca per id',
          'Search by name': 'Cerca per nome',
          'Search by email': 'Cerca per email',
          'Select One': 'Seleziona uno',
        },
      },
    },

    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title: 'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: props => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <PrimeReactProvider>
        {' '}
        <Outlet />
      </PrimeReactProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              style: { borderBottom: '1px solid #007bff' },
            }}
            activeOptions={{ exact: true }}
          >
            <Button label="Home" link />
          </Link>{' '}
          <Link
            to="/users"
            activeProps={{
              style: { borderBottom: '1px solid #007bff' },
            }}
          >
            <Button label={t('Users')} link />
          </Link>{' '}
        </div>

        {children}

        <Scripts />
      </body>
    </html>
  );
}
