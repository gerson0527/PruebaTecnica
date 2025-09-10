
/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Gestión de pacientes
 */
const express = require('express');
const { patientSchema } = require('../schemas/patient');
const patientService = require('../services/patientService');
const router = express.Router();

/**
 * @swagger
 * /api/v1/patients:
 *   post:
 *     summary: Crear un nuevo paciente
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       201:
 *         description: Paciente creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Error de validación
 */
router.post('/', async (req, res) => {
  const { error, value } = patientSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const patient = await patientService.createPatient(value);
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/v1/patients:
 *   get:
 *     summary: Obtener todos los pacientes
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 */
router.get('/', async (req, res) => {
  try {
    const patients = await patientService.getPatients();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/v1/patients/{id}:
 *   get:
 *     summary: Obtener un paciente por ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del paciente
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Paciente no encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const patient = await patientService.getPatientById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'No encontrado' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/v1/patients/{id}:
 *   put:
 *     summary: Actualizar un paciente
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       200:
 *         description: Paciente actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Error de validación
 */
router.put('/:id', async (req, res) => {
  const { error, value } = patientSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const patient = await patientService.updatePatient(req.params.id, value);
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/v1/patients/{id}:
 *   delete:
 *     summary: Eliminar un paciente
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del paciente
 *     responses:
 *       204:
 *         description: Paciente eliminado
 *       400:
 *         description: Error al eliminar
 */
router.delete('/:id', async (req, res) => {
  try {
    await patientService.deletePatient(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         nombre:
 *           type: string
 *         apellido:
 *           type: string
 *         fecha_nacimiento:
 *           type: string
 *           format: date
 *         sexo:
 *           type: string
 *         direccion:
 *           type: string
 *         telefono:
 *           type: string
 *         email:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */
module.exports = router;
