"""adds models tables

Revision ID: 70e78a1a447a
Revises: 
Create Date: 2024-06-29 16:50:16.272221

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '70e78a1a447a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('strategies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('instructions', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('teachers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('team', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.CheckConstraint('length(username) > 3', name='username_length_over_3'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('refelctions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('strategy_id', sa.Integer(), nullable=False),
    sa.Column('teacher_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['strategy_id'], ['strategies.id'], name=op.f('fk_refelctions_strategy_id_strategies')),
    sa.ForeignKeyConstraint(['teacher_id'], ['teachers.id'], name=op.f('fk_refelctions_teacher_id_teachers')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('refelctions')
    op.drop_table('teachers')
    op.drop_table('strategies')
    # ### end Alembic commands ###
