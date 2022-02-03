import { UserInputs } from "../types/interfaces";
import uuid4 from "uuid4";
import Main from "../databases/Main";
import argon2 from "argon2";

const random = ({ min, max }: { min: number; max: number }) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class User {
  id: number;
  username: string;
  email: string;
  permissions: number;
  salt: string;
  hashedPassword: string;
  token?: string;
  verified: boolean;
  verificationToken?: string;
  preferredName?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(inputs: UserInputs) {
    this.id = inputs.id;
    this.username = inputs.username;
    this.email = inputs.email;
    this.permissions = inputs.permissions;
    this.salt = inputs.salt;
    this.hashedPassword = inputs.hashedPassword;
    this.token = inputs.token;
    this.verified = inputs.verified;
    this.verificationToken = inputs.verificationToken;
    this.preferredName = inputs.preferredName;
    this.createdAt = inputs.createdAt;
    this.updatedAt = inputs.updatedAt;
  }

  delete = async (): Promise<void> => {
    await Main.createQuery(`DELETE FROM users WHERE id=${this.id}`);
  };
  setUsername = async (value: string): Promise<void> => {
    await Main.createQuery(
      `${Main.resolveUpdateValues({
        values: { username: value },
        table: "users",
      })} WHERE id=${this.id}`
    );
    await this.setUpdatedAt();
    this.username = value;
  };
  setEmail = async (value: string): Promise<void> => {
    await Main.createQuery(
      `${Main.resolveUpdateValues({
        values: { email: value },
        table: "users",
      })} WHERE id=${this.id}`
    );
    await this.setUpdatedAt();
    this.email = value;
  };
  setPermissions = async (value: number): Promise<void> => {
    await Main.createQuery(
      `${Main.resolveUpdateValues({
        values: { permissions: value },
        table: "users",
      })} WHERE id=${this.id}`
    );
    await this.setUpdatedAt();
    this.permissions = value;
  };
  setSalt = async (value: string): Promise<void> => {
    await Main.createQuery(
      `${Main.resolveUpdateValues({
        values: { salt: value },
        table: "users",
      })} WHERE ud=${this.id}`
    );
    await this.setUpdatedAt();
    this.salt = value;
  };
  setPassword = async (value: string): Promise<void> => {
    const hashedPassword = await argon2.hash(this.salt + value);
    await Main.createQuery(
      `${Main.resolveUpdateValues({
        values: { hashed_password: hashedPassword },
        table: "users",
      })} WHERE id=${this.id}`
    );
    await this.setUpdatedAt();
    this.hashedPassword = hashedPassword;
  };
  setToken = async (value: string): Promise<void> => {
    await Main.createQuery(
      `${Main.resolveUpdateValues({
        values: { token: value },
        table: "users",
      })} WHERE id=${this.id}`
    );
    await this.setUpdatedAt();
    this.token = value;
  };
  verifyUser = async (): Promise<void> => {
    if (this.verified) return;
    await Main.createQuery(
      `${Main.resolveUpdateValues({
        values: { verified: 1 },
        table: "users",
      })}`
    );
    await this.setUpdatedAt();
    this.verified = true;
  };
  unVerifyUser = async (): Promise<void> => {
    if (!this.verified) return;
    await Main.createQuery(
      `${Main.resolveUpdateValues({
        values: { verified: 0 },
        table: "users",
      })}`
    );
    await this.setUpdatedAt();
    this.verified = false;
  };
  setVerificationToken = async (value: string): Promise<void> => {
    await Main.createQuery(
      `${Main.resolveUpdateValues({
        values: { verification_token: value },
        table: "users",
      })}`
    );
    await this.setUpdatedAt();
    this.verificationToken = value;
  };
  setPreferredName = async (value: string): Promise<void> => {
    await Main.createQuery(
      `${Main.resolveUpdateValues({
        values: { preferred_name: value },
        table: "users",
      })}`
    );
    await this.setUpdatedAt();
    this.verificationToken = value;
  };

  setUpdatedAt = async (): Promise<void> => {
    await Main.createQuery(
      `UPDATE users SET updated_at=CURRENT_TIMESTAMP() WHERE users.id=${this.id}`
    );
  };

  updateByValues = async (values: { [key: string]: any }): Promise<User> => {
    await Main.createQuery(
      `${Main.resolveUpdateValues({
        values: { ...values },
        table: "users",
      })} WHERE id=${this.id}`
    );
    await this.setUpdatedAt();
    return this;
  };

  generateToken = async (): Promise<void> => {
    await this.setToken(uuid4());
  };
  toJSON = (): { [key: string]: any } => {
    return {
      id: this.id,
      username: this.username,
      createdAt: this.createdAt.getTime(),
      updatedAt: this.updatedAt.getTime(),
      permissions: this.permissions,
      preferredName: this.preferredName,
    };
  };
}

export default User;
