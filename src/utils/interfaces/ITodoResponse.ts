export interface ITodoResponse {
    id: number,
    name: string,
    detail?: string,
    userId: number
}

/**
     * @swagger
     * components:
     *   schemas:
     *     ITodoResponse:
     *       type: object
     *       required:
     *         - id
     *         - name
     *       properties:
     *         id:
     *           type: integer
     *           description: Unique identifier for the todo item
     *         name:
     *           type: string
     *           description: Name of the todo item
     *         detail:
     *           type: string
     *           description: Optional detail of the todo item
     *           nullable: true
     */