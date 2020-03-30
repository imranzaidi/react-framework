const path = require('path');

module.exports = {
  resolve: {
    // extensions: ['.js', '.jsx', '.scss'],
    extensions: ['.js', '.jsx'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@reducers': path.resolve(__dirname, 'src/reducers/'),
      '@actions': path.resolve(__dirname, 'src/actions/'),
      '@constants': path.resolve(__dirname, 'src/constants/'),
      '@routes': path.resolve(__dirname, 'src/routes/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@server': path.resolve(__dirname, 'server/'),
      '@src': path.resolve(__dirname, 'src/'),
      '@root': path.resolve(__dirname, '/'),
      '@utils': path.resolve(__dirname, 'utils/'),
      '@assets': path.resolve(__dirname, 'assets/')
    }
  }
};
