module.exports = {
  apps: [
    {
      name: "gamingin",
      script: "./bin/www",
      env: {
        PORT: 81,
        NODE_ENV: "production",
        JWT_SECRET: "JAJAJAJA",
        Api_Key: "0f41aa9ca0674302bd34812f9a3b421c",
        Client_Id:
          "561585036554-26netalh14kj92bkhlr013cbsmol8e9e.apps.googleusercontent.com",
        Client_Secret: "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",
        Client_Key_Midtrans: "SB-Mid-client-lcZYioRpY5NdQF8D",
        Server_Key_Midtrans: "SB-Mid-server-Rizj0XRlr-lQyAupxonR_86n",
        Merchant_Id_Midtrans: "G735877117",
        DATABASE_URL:
          "postgres://postgres.bqnmsqpfujklrbbtrqrt:Ixf0NoNynRIbHs6b@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres",
      },
    },
  ],
};
