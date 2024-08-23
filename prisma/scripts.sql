DROP TABLE IF EXISTS public.daily_expenses;


CREATE TABLE public.daily_expenses (
    expense_id SERIAL PRIMARY KEY,                    -- Identificador único para cada gasto
    expense_date DATE NOT NULL,                       -- Fecha del gasto
    expense_category VARCHAR(50) NOT NULL,            -- Categoría del gasto
    expense_description TEXT,                         -- Descripción opcional del gasto
    expense_amount DECIMAL(10, 2) NOT NULL,           -- Monto del gasto
    expense_payment_method VARCHAR(50),               -- Método de pago (opcional)
    expense_location VARCHAR(100),                    -- Ubicación donde se realizó el gasto (opcional)
    expense_notes TEXT,                               -- Notas adicionales (opcional)
    user_id INTEGER NOT NULL,                         -- Clave foránea referenciando a User
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),    -- Fecha de creación del registro
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),    -- Fecha de última actualización del registro
    FOREIGN KEY (user_id) REFERENCES public."User"(id) ON DELETE CASCADE  -- Clave foránea que referencia a la tabla User
);