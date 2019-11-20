/* eslint-disable max-classes-per-file */
/* eslint-disable no-undef */
// import fs from 'fs';
// import path from 'path';
import moment from 'moment';
// import jwt from 'jsonwebtoken';
import {
  Controller,
  Security,
  Post,
  Put,
  Route,
  Tags,
  Example,
  Body
} from 'tsoa';
import v5 from 'uuid/v4';

export type ChargingState = 'started' | 'stopped' | 'scheduled';
export interface ChargingSession {
  id: string;
  userIdThatStartedTransaction: string;
  transationStartedAt: string;
  transactionDuration?: string;
  transactionWattHourCharged?: string;
  state: ChargingState;
}
export interface UpdateChargingSession {
  state: ChargingState;
}

@Route('charging-session')
export class ChargingSessionsController extends Controller {
  @Post()
  @Security('jwtAuth')
  @Example<ChargingSession>({
    id: 'b4964e7a-439d-45ff-b860-f13a70f94c71',
    userIdThatStartedTransaction: 'ffffff',
    transationStartedAt: moment().toISOString(true),
    state: 'started'
  })
  @Tags('Charge point')
  public async createChargingSession(): Promise<ChargingSession> {
    // new ChargingSessionService().create(requestBody);
    this.setStatus(201); // set return status 201
    status = 'charging';
    return Promise.resolve({
      id: v5(),
      userIdThatStartedTransaction: 'fffffff',
      transationStartedAt: moment().toISOString(true),
      state: 'started'
    });
  }

  @Put('{sessionId}')
  @Security('jwtAuth')
  @Tags('Charge point')
  // @Example<ChargingSession>({
  //   id: 'b4964e7a-439d-45ff-b860-f13a70f94c71',
  //   date: '2019-11-15T13:47:29.109+01:00'
  // })
  public async endChargingSession(
    sessionId: string,
    @Body() updateChargingSession: UpdateChargingSession
  ): Promise<{}> {
    // new ChargingSessionService().create(requestBody);
    status = 'idle';
    this.setStatus(201); // set return status 201
    return Promise.resolve({
      id: sessionId,
      ...updateChargingSession
    });
  }
}

// import { Body, Delete, Example, Get, Patch, Post, Route } from 'tsoa';

// // import { ChargingSession, ChargingSessionCreateRequest, ChargingSessionUpdateRequest } from '../models/user';

// export interface ChargingSession {
//   id: number;
//   email: string;
//   createdAt: Date;
// }

// export interface ChargingSessionCreateRequest {
//   email: string;
// }

// export interface ChargingSessionUpdateRequest {
//   createdAt?: Date;
//   email: string;
// }

// @Route('ChargingSessions')
// export class ChargingSessionsController {
//   /** Get the current user */
//   @Get('Current')
//   @Example<ChargingSession>({
//     createdAt: new Date(),
//     email: 'test@test.com',
//     id: 1
//   })
//   public async Current(): Promise<ChargingSession> {
//     return {
//       createdAt: new Date(),
//       email: 'test',
//       id: 666
//     };
//   }

//   /** Get user by ID */
//   @Get('{userId}')
//   public async Get(userId: number): Promise<ChargingSession> {
//     return {
//       createdAt: new Date(),
//       email: 'test2',
//       id: userId
//     };
//   }

//   /**
//    * Create a user
//    * @param request This is a user creation request description
//    */
//   @Post()
//   public async Create(@Body() request: ChargingSessionCreateRequest): Promise<ChargingSession> {
//     return {
//       createdAt: new Date(),
//       email: request.email,
//       id: 666
//     };
//   }

//   /** Delete a user by ID */
//   @Delete('{userId}')
//   public async Delete(userId: number): Promise<void> {
//     return Promise.resolve();
//   }

//   /** Update a user */
//   @Patch()
//   public async Update(@Body() request: ChargingSessionUpdateRequest): Promise<ChargingSession> {
//     return {
//       createdAt: request.createdAt,
//       email: request.email,
//       id: 1337
//     };
//   }
// }
