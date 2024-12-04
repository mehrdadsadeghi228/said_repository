
class MenuController {
    constructor() {
    }
    async getMenu(req, res) {
        try {
            res.status(200).render('index');
        } catch (error) {
            logger.error('error for faild in createCertification',error +error.stack);
            res.status(500).json({ message: 'Error fetching menu', error });
        }
    }
    async getContactPage(req, res) {
        try {
            res.status(200).render('contact');
        } catch (error) {
            logger.error('error for faild in createCertification',error +error.stack);
            res.status(500).json({ message: 'Error fetching menu', error });
        }
    }
    async getAboutPage(req, res) {
        try {
            res.status(200).render('about');
        } catch (error) {
            logger.error('error for faild in createCertification',error +error.stack);
            res.status(500).json({ message: 'Error fetching menu', error });
        }
    }

    async postContactPage(req, res) {
        try {
            const { name, email, message } = req.body;
            console.log('Contact Form Submission:', { name, email, message });
            res.send('Thank you for your message!');       
            }catch (error) {
            logger.error('error for faild in createCertification',error +error.stack);
            res.status(500).json({ message: 'Error fetching menu', error });
            }
    }

}

module.exports =new MenuController();
