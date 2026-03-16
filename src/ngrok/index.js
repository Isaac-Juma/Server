import ngrok from '@ngrok/ngrok';

/**
 * Start ngrok tunnel to expose local server to the internet
 * @param {number} port - Local port to expose
 * @returns {Promise<string>} - Public ngrok URL
 */
export const startNgrok = async (port) => {
  try {
    const response = await ngrok.connect({
      addr: port,
      authtoken: process.env.NGROK_AUTHTOKEN, // Get from https://dashboard.ngrok.com/get-started/your-authtoken
    });

    // Extract URL - response.url is a function that needs to be called
    let url;
    if (typeof response.url === 'function') {
      url = response.url();
    } else if (typeof response === 'string') {
      url = response;
    } else if (response?.url) {
      url = response.url;
    } else {
      url = String(response);
    }
    
    console.log(`\n🌐 ngrok tunnel opened at: ${url}`);
    return url;
  } catch (error) {
    console.error('❌ Failed to start ngrok:', error.message);
    console.error('Error details:', error);
    process.exit(1);
  }
};

/**
 * Stop ngrok tunnel
 */
export const stopNgrok = async () => {
  try {
    await ngrok.kill();
    console.log('✅ ngrok tunnel closed');
  } catch (error) {
    console.error('❌ Error closing ngrok:', error.message);
  }
};
