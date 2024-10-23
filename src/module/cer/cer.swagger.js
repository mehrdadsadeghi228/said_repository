/**
 * @swagger
 * /api/certifications:
 *   get:
 *     tags:
 *       - Certifications
 *     summary: Get all certifications
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Certification'
 *   post:
 *     tags:
 *       - Certifications
 *     summary: Create new certification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CertificationInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certification'
 * 
 * /api/certifications/{id}:
 *   get:
 *     tags:
 *       - Certifications
 *     summary: Get certification by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certification'
 *   put:
 *     tags:
 *       - Certifications
 *     summary: Update certification
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CertificationInput'
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     tags:
 *       - Certifications
 *     summary: Delete certification
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 * 
 * components:
 *   schemas:
 *     Certification:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         issuedBy:
 *           type: string
 *         issuedDate:
 *           type: string
 *           format: date
 *         expiryDate:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [active, expired, revoked]
 *     CertificationInput:
 *       type: object
 *       required:
 *         - name
 *         - issuedBy
 *         - issuedDate
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         issuedBy:
 *           type: string
 *         issuedDate:
 *           type: string
 *           format: date
 *         expiryDate:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [active, expired, revoked]
 */

