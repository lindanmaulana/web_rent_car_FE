import localFont from 'next/font/local';

const PoppinsRegular = localFont({
  src: [
    {
      path: './poppins/Poppins-Regular.ttf',
      style: 'normal',
      weight: '400',
    },
    {
      path: './poppins/Poppins-Regular.woff',
      style: 'normal',
      weight: '400',
    },
    {
      path: './poppins/Poppins-Regular.woff2',
      style: 'normal',
      weight: '400',
    },
  ],

  variable: '--font-poppins-regular',
  display: 'swap',
});

const PoppinsSemiBold = localFont({
  src: [
    {
      path: './poppins/Poppins-SemiBold.ttf',
      style: 'normal',
      weight: '600',
    },
    {
      path: './poppins/Poppins-SemiBold.woff',
      style: 'normal',
      weight: '600',
    },
    {
      path: './poppins/Poppins-SemiBold.woff2',
      style: 'normal',
      weight: '600',
    },
  ],

  variable: '--font-poppins-semibold',
  display: 'swap',
});

const PoppinsMedium = localFont({
  src: [
    {
      path: './poppins/Poppins-Medium.ttf',
      style: 'normal',
      weight: '500',
    },
    {
      path: './poppins/Poppins-Medium.woff',
      style: 'normal',
      weight: '500',
    },
    {
      path: './poppins/Poppins-Medium.woff2',
      style: 'normal',
      weight: '500',
    },
  ],

  variable: '--font-poppins-medium',
  display: 'swap',
});


export {
    PoppinsRegular,
    PoppinsMedium,
    PoppinsSemiBold
}