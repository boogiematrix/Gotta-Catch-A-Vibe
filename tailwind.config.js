module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
          backgroundImage: theme => ({
         'forest': "url('../public/images/redwoodscene.jpg')",
        })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
