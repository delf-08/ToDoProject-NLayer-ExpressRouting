export interface ITodoCreateRequest {
    name: string;
    detail?: string;
    userId: number;
}

export interface ITodoUpdateRequest {
    id: number;
    name?: string;
    detail?: string;
    userId: number
}


/**
     * @swagger
     * components:
     *   schemas:
     *     ITodoCreateRequest:
     *       type: object
     *       required:
     *         - name
     *       properties:
     *         name:
     *           type: string
     *           description: Name of the todo item
     *         detail:
     *           type: string
     *           description: Optional detail of the todo item
     *           nullable: true
     */


/**
     * @swagger
     * components:
     *   schemas:
     *     ITodoUpdateRequest:
     *       type: object
     *       required:
     *         - id
     *       properties:
     *         id:
     *           type: integer
     *           description: Unique identifier for the todo item to update
     *         name:
     *           type: string
     *           description: New name for the todo item
     *           nullable: true
     *         detail:
     *           type: string
     *           description: New detail for the todo item
     *           nullable: true
     */